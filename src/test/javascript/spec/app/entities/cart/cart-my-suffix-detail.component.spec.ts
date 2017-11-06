/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ServeaseTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CartMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/cart/cart-my-suffix-detail.component';
import { CartMySuffixService } from '../../../../../../main/webapp/app/entities/cart/cart-my-suffix.service';
import { CartMySuffix } from '../../../../../../main/webapp/app/entities/cart/cart-my-suffix.model';

describe('Component Tests', () => {

    describe('CartMySuffix Management Detail Component', () => {
        let comp: CartMySuffixDetailComponent;
        let fixture: ComponentFixture<CartMySuffixDetailComponent>;
        let service: CartMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ServeaseTestModule],
                declarations: [CartMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CartMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(CartMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CartMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CartMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CartMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.cart).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
