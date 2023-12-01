import { OverlayElement } from './overlay';

describe('OverlayElement', () => {
  let element: OverlayElement<any>;

  const instanceSpy = {
    append: jasmine.createSpy('append')
  };

  const overlayRefSpy = {
    attach: jasmine.createSpy('attach'),
    dispose: jasmine.createSpy('dispose')
  };

  const componentSpy = {
    instance: instanceSpy,
    location: {
      nativeElement: {}
    },
    destroy: jasmine.createSpy('destroy')
  };

  const portalSpy = {};

  overlayRefSpy.attach.and.returnValue(componentSpy);

  beforeEach(() => {
    element = new OverlayElement(overlayRefSpy as any, portalSpy as any);
  });

  afterEach(() => {
    overlayRefSpy.attach.calls.reset();
    overlayRefSpy.dispose.calls.reset();
    instanceSpy.append.calls.reset();
    componentSpy.destroy.calls.reset();
  });

  it('should create the element', () => {
    expect(element).toBeTruthy();

    expect(overlayRefSpy.attach).toHaveBeenCalledTimes(1);
    expect(overlayRefSpy.attach).toHaveBeenCalledWith(portalSpy);
  });

  it('should have these initial values', () => {
    expect(element.instance).toEqual(instanceSpy);
    expect(element.nativeElement).toEqual(
      componentSpy.location.nativeElement as any
    );
  });

  it('should execute function destroy successful', () => {
    element.destroy();

    expect(componentSpy.destroy).toHaveBeenCalledTimes(1);
    expect(overlayRefSpy.dispose).toHaveBeenCalledTimes(1);
  });
});
