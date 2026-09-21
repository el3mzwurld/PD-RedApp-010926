export interface Volume {
  name: string;
  y: number;
}

export const transactionVolume: Volume[] = [
  { name: "12-2am", y: 230 },
  { name: "3-4am", y: 150 },
  { name: "4-6am", y: 300 },
  { name: "6-8am", y: 400 },
  { name: "8-10am", y: 500 },
  { name: "10-12pm", y: 600 },
  { name: "12-2pm", y: 700 },
  { name: "2-4pm", y: 800 },
];

export const transactionCount: Volume[] = [
  { name: "12-2am", y: 180 },
  { name: "3-5am", y: 220 },
  { name: "5-7am", y: 260 },
  { name: "7-9am", y: 320 },
  { name: "9-11am", y: 410 },
  { name: "11-1pm", y: 500 },
  { name: "1-3pm", y: 610 },
  { name: "3-5pm", y: 720 },
];

export const transactionVolumeByDay: Volume[] = [
  { name: "Mon", y: 2200 },
  { name: "Tue", y: 2450 },
  { name: "Wed", y: 2600 },
  { name: "Thu", y: 2900 },
  { name: "Fri", y: 3600 },
  { name: "Sat", y: 3300 },
  { name: "Sun", y: 2500 },
];

export const transactionCountByDay: Volume[] = [
  { name: "Mon", y: 1600 },
  { name: "Tue", y: 1750 },
  { name: "Wed", y: 1850 },
  { name: "Thu", y: 2100 },
  { name: "Fri", y: 2550 },
  { name: "Sat", y: 2400 },
  { name: "Sun", y: 1800 },
];

export const transactionVolumeByMonth: Volume[] = [
  { name: "Jan", y: 3100 },
  { name: "Feb", y: 3400 },
  { name: "Mar", y: 3800 },
  { name: "Apr", y: 4200 },
  { name: "May", y: 4600 },
  { name: "Jun", y: 5000 },
  { name: "Jul", y: 5500 },
  { name: "Aug", y: 5300 },
  { name: "Sep", y: 4900 },
  { name: "Oct", y: 4700 },
  { name: "Nov", y: 4300 },
  { name: "Dec", y: 5900 },
];

export const transactionCountByMonth: Volume[] = [
  { name: "Jan", y: 2200 },
  { name: "Feb", y: 2450 },
  { name: "Mar", y: 2700 },
  { name: "Apr", y: 2950 },
  { name: "May", y: 3200 },
  { name: "Jun", y: 3500 },
  { name: "Jul", y: 3900 },
  { name: "Aug", y: 3750 },
  { name: "Sep", y: 3400 },
  { name: "Oct", y: 3300 },
  { name: "Nov", y: 3100 },
  { name: "Dec", y: 4100 },
];
