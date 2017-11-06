/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ServeaseTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ProductMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/product/product-my-suffix-detail.component';
import { ProductMySuffixService } from '../../../../../../main/webapp/app/entities/product/product-my-suffix.service';
import { ProductMySuffix } from '../../../../../../main/webapp/app/entities/product/product-my-suffix.model';

describe('Component Tests', () => {

    describe('ProductMySuffix Management Detail Component', () => {
        let comp: ProductMySuffixDetailComponent;
        let fixture: ComponentFixture<ProductMySuffixDetailComponent>;
        let service: ProductMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ServeaseTestModule],
                declarations: [ProductMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ProductMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(ProductMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ProductMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.product).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
