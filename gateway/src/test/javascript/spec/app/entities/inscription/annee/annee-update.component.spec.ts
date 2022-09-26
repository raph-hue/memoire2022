import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AnneeUpdateComponent } from 'app/entities/inscription/annee/annee-update.component';
import { AnneeService } from 'app/entities/inscription/annee/annee.service';
import { Annee } from 'app/shared/model/inscription/annee.model';

describe('Component Tests', () => {
  describe('Annee Management Update Component', () => {
    let comp: AnneeUpdateComponent;
    let fixture: ComponentFixture<AnneeUpdateComponent>;
    let service: AnneeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AnneeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AnneeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AnneeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AnneeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Annee(123);
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
        const entity = new Annee();
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
