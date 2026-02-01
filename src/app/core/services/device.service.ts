import { Injectable, inject, computed } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Device, DeviceType } from 'src/app/config';
import { Breakpoint } from '../config';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  private readonly breakpointObserver = inject(BreakpointObserver);

  private readonly currentBreakpoint = toSignal(
    this.breakpointObserver
      .observe([Breakpoint.Mobile, Breakpoint.Tablet, Breakpoint.Desktop])
      .pipe(
        map((result): DeviceType => {
          if (result.breakpoints[Breakpoint.Mobile]) return Device.Mobile;
          if (result.breakpoints[Breakpoint.Tablet]) return Device.Tablet;
          return Device.Desktop;
        }),
      ),
    { initialValue: Device.Desktop },
  );

  readonly deviceType = this.currentBreakpoint;
  readonly isMobile = computed(() => this.currentBreakpoint() === Device.Mobile);
  readonly isTablet = computed(() => this.currentBreakpoint() === Device.Tablet);
  readonly isDesktop = computed(() => this.currentBreakpoint() === Device.Desktop);
}
