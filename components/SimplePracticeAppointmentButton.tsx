'use client';

const SIMPLEPRACTICE_SCOPE_ID = '132ae8a2-6d9a-43d4-84d4-fa1d69bfb2ba';
const SIMPLEPRACTICE_SCOPE_URI = 'tebarak-al-shamsy6312';
const SIMPLEPRACTICE_APP_ID = '7c72cb9f9a9b913654bb89d6c7b4e71a77911b30192051da35384b4d0c6d505b';
const CLIENT_SECURE_URL = 'https://tebarak-al-shamsy6312.clientsecure.me';

export interface SimplePracticeAppointmentButtonProps {
  className?: string;
  children?: React.ReactNode;
}

/** Renders a link that opens the SimplePractice "Request Appointment" widget when clicked. */
export default function SimplePracticeAppointmentButton({
  className = '',
  children = 'Request Appointment',
}: SimplePracticeAppointmentButtonProps) {
  return (
    <a
      href={CLIENT_SECURE_URL}
      className={className}
      data-spwidget-scope-id={SIMPLEPRACTICE_SCOPE_ID}
      data-spwidget-scope-uri={SIMPLEPRACTICE_SCOPE_URI}
      data-spwidget-application-id={SIMPLEPRACTICE_APP_ID}
      data-spwidget-type="OAR"
      data-spwidget-scope-global
      data-spwidget-autobind
    >
      {children}
    </a>
  );
}
