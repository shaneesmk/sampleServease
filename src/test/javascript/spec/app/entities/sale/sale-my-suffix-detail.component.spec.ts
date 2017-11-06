/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ServeaseTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SaleMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/sale/sale-my-suffix-detail.component';
import { SaleMySuffixService } from '../../../../../../main/webapp/app/entities/sale/sale-my-suffix.service';
import { SaleMySuffix } from '../../../../../../main/webapp/app/entities/sale/sale-my-suffix.model';

describe('Component Tests', () => {

    describe('SaleMySuffix Management Detail Component', () => {
        let comp: SaleMySuffixDetailComponent;
        let fixture: ComponentFixture<SaleMySuffixDetailComponent>;
        let service: SaleMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ServeaseTestModule],
                declarations: [SaleMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SaleMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(SaleMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SaleMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SaleMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new SaleMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.sale).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
