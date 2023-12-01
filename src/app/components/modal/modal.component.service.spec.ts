import { TextFieldComponent } from '../text-field/text-field.component';
import { ModalComponentService } from './modal.component.service';

describe('ModalComponentService', () => {
  let service: ModalComponentService;

  const overlaySpy = {
    create: jasmine.createSpy('create')
  };

  const refSpy = {
    attach: jasmine.createSpy('attach'),
    dispose: jasmine.createSpy('dispose')
  };

  const componentSpy = {
    instance: {
      append: jasmine.createSpy('append'),
      ngOnOverlay: jasmine.createSpy('ngOnOverlay')
    },
    location: {
      nativeElement: {}
    },
    destroy: jasmine.createSpy('destroy')
  };

  overlaySpy.create.and.returnValue(refSpy);
  refSpy.attach.and.returnValue(componentSpy);

  beforeEach(() => {
    service = new ModalComponentService(overlaySpy as any);
  });

  afterEach(() => {
    overlaySpy.create.calls.reset();
    refSpy.attach.calls.reset();
    refSpy.dispose.calls.reset();
    componentSpy.destroy.calls.reset();
    componentSpy.instance.append.calls.reset();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('', () => {
    service.build(TextFieldComponent as any);

    expect(componentSpy.instance.append).toHaveBeenCalledTimes(1);
  });
});
