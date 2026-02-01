export const Device = {
  Mobile: 'mobile',
  Tablet: 'tablet',
  Desktop: 'desktop',
} as const;

export type DeviceType = (typeof Device)[keyof typeof Device];
