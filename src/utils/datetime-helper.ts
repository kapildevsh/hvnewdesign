export const timeFormatter = new Intl.DateTimeFormat('default', {
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
});

export const shortFormatter = new Intl.DateTimeFormat('default', {
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
});

export const fullFormatter = new Intl.DateTimeFormat('default', {
  hour: 'numeric',
  minute: 'numeric',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
});

export const millsPerHour = 3.6e6;
export const millsPerMinute = 60000;

export function formatDate(dateString: string | Date): { str: string; iso: string; short?: boolean } {
  if (!dateString) return { str: null, iso: null };

  const date = new Date(dateString);
  const today = new Date();
  const diff = today.getTime() - date.getTime();

  if (diff < 0) {
    console.warn('date is in future: ', date);

    return {
      str: String(date),
      iso: date.toISOString(),
    };
  }

  if (diff < millsPerHour * 6) {
    if (diff < millsPerHour)
      return { str: `${Math.floor(diff / millsPerMinute)}min ago`, iso: date.toISOString(), short: true };
    return { str: `${Math.floor(diff / millsPerHour)}hrs ago`, iso: date.toISOString(), short: true };
  }

  today.setHours(0, 0, 0, 0);

  return {
    short: date > today,
    str: date > today ? 'Today ' + timeFormatter.format(date) : shortFormatter.format(date),
    iso: date.toISOString(),
  };
}
