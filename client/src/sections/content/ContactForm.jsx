import { CircleAlert, CircleCheck, LoaderCircle, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import { TextField } from '@/components/forms/TextField';
import { Button } from '@/components/ui/Button';
import { profile } from '@/data/profile';
import { trackEvent } from '@/services/analytics';
import { ApiError, sendContactMessage } from '@/services/api';
import { CONTACT_LIMITS, validateContact } from '@/utils/validateContact';

const FIELD_ORDER = ['name', 'email', 'subject', 'message'];

// Only validation and rate-limit responses carry messages meant for visitors.
const VISITOR_FACING_STATUSES = new Set([400, 422, 429]);

const readForm = (form) => Object.fromEntries(new FormData(form));

/** Confirmation shown after sending; fades up and moves focus to its heading on mount. */
function SuccessMessage({ onReset }) {
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="animate-rise py-6">
      <CircleCheck aria-hidden="true" className="size-8 text-success" />
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="mt-4 text-xl font-semibold tracking-tight outline-none"
      >
        Message sent
      </h3>
      <p className="mt-2 text-fg-muted">
        Thanks for reaching out — I&apos;ll reply to the email address you provided.
      </p>
      <Button variant="secondary" className="mt-6" onClick={onReset}>
        Send another message
      </Button>
    </div>
  );
}

const describeSubmitError = (error) =>
  error instanceof ApiError && VISITOR_FACING_STATUSES.has(error.status)
    ? error.message
    : 'The message service is unavailable right now — please try again later.';

export function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errors, setErrors] = useState({});
  const [hasAttempted, setHasAttempted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [messageLength, setMessageLength] = useState(0);
  // After the first submit attempt, re-validate as the visitor types.
  const handleChange = (event) => {
    if (event.target.name === 'message') setMessageLength(event.target.value.length);
    if (hasAttempted) setErrors(validateContact(readForm(event.currentTarget)));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { website, ...values } = readForm(form);

    // Honeypot: real visitors never see or fill this field.
    if (website) {
      setStatus('success');
      return;
    }

    const nextErrors = validateContact(values);
    setHasAttempted(true);
    setErrors(nextErrors);
    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      form.elements[firstInvalid].focus();
      return;
    }

    setStatus('submitting');
    setSubmitError('');
    try {
      await sendContactMessage({
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
      });
      form.reset();
      setMessageLength(0);
      setHasAttempted(false);
      setStatus('success');
      trackEvent('contact_submit');
    } catch (error) {
      const fieldErrors = error instanceof ApiError && error.status === 400 && error.details;
      const firstInvalid = fieldErrors && FIELD_ORDER.find((field) => fieldErrors[field]);

      if (firstInvalid) {
        // The server rejected fields the client accepted: show its messages inline.
        // flushSync re-enables the inputs before focus moves to the first invalid one.
        flushSync(() => {
          setErrors(fieldErrors);
          setStatus('idle');
        });
        form.elements[firstInvalid].focus();
        return;
      }

      setSubmitError(describeSubmitError(error));
      setStatus('error');
    }
  };

  const isSubmitting = status === 'submitting';

  const formElement = (
    <form
      noValidate
      aria-labelledby="contact-form-title"
      aria-busy={isSubmitting}
      onSubmit={handleSubmit}
      onChange={handleChange}
      className="@container relative grid animate-fade-in gap-5"
    >
      <h3 id="contact-form-title" className="text-lg font-semibold tracking-tight">
        Send a message
      </h3>

      <div className="grid gap-5 @sm:grid-cols-2">
        <TextField
          label="Name"
          name="name"
          autoComplete="name"
          required
          maxLength={CONTACT_LIMITS.name.max}
          error={errors.name}
          disabled={isSubmitting}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          maxLength={CONTACT_LIMITS.email.max}
          error={errors.email}
          disabled={isSubmitting}
        />
      </div>
      <TextField
        label="Subject"
        name="subject"
        optional
        maxLength={CONTACT_LIMITS.subject.max}
        error={errors.subject}
        disabled={isSubmitting}
      />
      <TextField
        label="Message"
        name="message"
        multiline
        rows={6}
        required
        maxLength={CONTACT_LIMITS.message.max}
        hint={`${messageLength} / ${CONTACT_LIMITS.message.max}`}
        error={errors.message}
        disabled={isSubmitting}
      />

      {/* Honeypot for bots — hidden from people and assistive technology. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="flex gap-3 rounded-lg border border-danger/40 bg-danger/[0.08] p-4 text-sm"
        >
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-danger" />
          <p className="text-fg">
            Your message couldn&apos;t be sent. {submitError} You can also email me directly at{' '}
            <a href={`mailto:${profile.email}`} className="underline underline-offset-4">
              {profile.email}
            </a>
            .
          </p>
        </div>
      )}

      <div>
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full @sm:w-auto">
          {isSubmitting ? (
            <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
          ) : (
            <Send aria-hidden="true" className="size-4" />
          )}
          {isSubmitting ? 'Sending…' : 'Send message'}
        </Button>
      </div>
    </form>
  );

  // CSS entrance animations only (no animation library on the plain portfolio).
  return status === 'success' ? <SuccessMessage onReset={() => setStatus('idle')} /> : formElement;
}
