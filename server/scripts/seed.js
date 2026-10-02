// Seeds projects and experience from the client's content files, which remain the
// single source of truth. Idempotent: new entries are inserted, changed entries are
// updated, identical entries are left untouched, and entries that exist only in the
// database are reported but never deleted. Contact messages and site events are
// never touched.
//
// Usage (from server/): npm run seed

import { isDeepStrictEqual } from 'node:util';

import { experience } from '../../client/src/data/experience.js';
import { projects } from '../../client/src/data/projects.js';
import { connectDatabase, disconnectDatabase } from '../src/config/db.js';
import { env } from '../src/config/env.js';
import { ContactMessage } from '../src/models/ContactMessage.js';
import { Experience } from '../src/models/Experience.js';
import { Project } from '../src/models/Project.js';
import { SiteEvent } from '../src/models/SiteEvent.js';

// Content is copied verbatim; only the shape is adapted (id → slug, "YYYY-MM" → Date).
const monthToDate = (value) => (value ? new Date(`${value}-01T00:00:00.000Z`) : null);

const projectDocs = projects.map((project) => ({
  slug: project.id,
  title: project.title,
  category: project.category,
  period: project.period ?? null,
  role: project.role ?? null,
  description: project.description,
  highlights: project.highlights ?? [],
  technologies: project.technologies ?? [],
  githubUrl: project.githubUrl ?? null,
  liveUrl: project.liveUrl ?? null,
  image: project.image ?? null,
  featured: Boolean(project.featured),
  order: project.order,
}));

const experienceDocs = experience.map((entry) => ({
  slug: entry.id,
  company: entry.company,
  role: entry.role,
  level: entry.level ?? null,
  location: entry.location ?? null,
  startDate: monthToDate(entry.startDate),
  endDate: monthToDate(entry.endDate),
  description: entry.description ?? '',
  highlights: entry.highlights ?? [],
  technologies: entry.technologies ?? [],
  order: entry.order,
}));

// JSON round-trip turns Dates into ISO strings so stored and seed values compare equal.
const comparable = (value) => JSON.parse(JSON.stringify(value));
const pick = (source, keys) => Object.fromEntries(keys.map((key) => [key, source[key] ?? null]));

async function syncCollection(Model, docs, label) {
  const slugs = docs.map((doc) => doc.slug);
  const duplicate = slugs.find((slug, index) => slugs.indexOf(slug) !== index);
  if (duplicate) throw new Error(`${label}: duplicate slug "${duplicate}" in seed data`);

  // Validate everything up front so a bad entry aborts before any write happens.
  await Promise.all(docs.map((doc) => Model.validate(doc)));

  const existing = await Model.find({}).lean();
  const bySlug = new Map(existing.map((doc) => [doc.slug, doc]));
  const counts = { inserted: 0, updated: 0, unchanged: 0 };

  for (const doc of docs) {
    const current = bySlug.get(doc.slug);
    if (!current) {
      await Model.create(doc);
      counts.inserted += 1;
    } else if (isDeepStrictEqual(comparable(pick(current, Object.keys(doc))), comparable(doc))) {
      counts.unchanged += 1;
    } else {
      await Model.updateOne({ slug: doc.slug }, { $set: doc }, { runValidators: true });
      counts.updated += 1;
    }
  }

  console.log(
    `${label}: ${docs.length} in seed data — ${counts.inserted} inserted, ${counts.updated} updated, ${counts.unchanged} unchanged`,
  );

  const seedSlugs = new Set(slugs);
  const extra = existing.filter((doc) => !seedSlugs.has(doc.slug)).map((doc) => doc.slug);
  if (extra.length) {
    console.warn(`  Only in the database (left untouched): ${extra.join(', ')}`);
  }
}

try {
  await connectDatabase(env.mongodbUri, env.mongodbDbName);
  // Ensure every collection's indexes exist, including the SiteEvent TTL index.
  await Promise.all([Project, Experience, ContactMessage, SiteEvent].map((Model) => Model.init()));
  await syncCollection(Project, projectDocs, 'Projects');
  await syncCollection(Experience, experienceDocs, 'Experience');
  console.log('Contact messages and site events were not touched.');
} catch (error) {
  console.error(`Seed failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  await disconnectDatabase();
}
