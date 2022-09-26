import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { SalleUpdateComponent } from 'app/entities/immoblier/salle/salle-update.component';
import { SalleService } from 'app/entities/immoblier/salle/salle.service';
import { Salle } from 'app/shared/model/immoblier/salle.model';

describe('Component Tests', () => {
  describe('Salle Management Update Component', () => {
    let comp: SalleUpdateComponent;
    let fixture: ComponentFixture<SalleUpdateComponent>;
    let service: SalleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SalleUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SalleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SalleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SalleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Salle(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Salle();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
