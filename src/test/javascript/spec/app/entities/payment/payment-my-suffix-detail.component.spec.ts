/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ServeaseTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PaymentMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/payment/payment-my-suffix-detail.component';
import { PaymentMySuffixService } from '../../../../../../main/webapp/app/entities/payment/payment-my-suffix.service';
import { PaymentMySuffix } from '../../../../../../main/webapp/app/entities/payment/payment-my-suffix.model';

describe('Component Tests', () => {

    describe('PaymentMySuffix Management Detail Component', () => {
        let comp: PaymentMySuffixDetailComponent;
        let fixture: ComponentFixture<PaymentMySuffixDetailComponent>;
        let service: PaymentMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ServeaseTestModule],
                declarations: [PaymentMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PaymentMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(PaymentMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaymentMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaymentMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PaymentMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.payment).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
