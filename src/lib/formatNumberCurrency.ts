const formatNumberCurrency = (value: number, unit?: string, suffix?: string): string => {
  let formattedValue = value;

  switch (unit) {
    case "т":
      formattedValue = value / 1000;
      break;
    case "млн":
      formattedValue = value / 1_000_000;
      break;
    case "млрд":
      formattedValue = value / 1_000_000_000;
      break;
    default:
      break;
  }


  const formattedNumber = new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(formattedValue);

  return `${formattedNumber} ${suffix ? ` ${suffix}` : ""}`;
};

export { formatNumberCurrency };