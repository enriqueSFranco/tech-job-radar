export function timeAgo(value: string) {
  const now = new Date();
  const date = new Date(value);

  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, "seconds"],
    [60, "minutes"],
    [24, "hours"],
    [7, "days"],
    [4.34524, "weeks"],
    [12, "months"],
    [Number.POSITIVE_INFINITY, "years"],
  ];

  const rtf = new Intl.RelativeTimeFormat("es", { style: "short" });
  let time = diffInSeconds;
  let unit: Intl.RelativeTimeFormatUnit = "second";

  for (let i = 0, len = units.length; i < len; i++) {
    const [limit, currUnit] = units[i];
    if (Math.abs(time) < limit) {
      unit = currUnit;
      break;
    }
    time /= limit;
  }
  return rtf.format(-Math.floor(time), unit);
}
