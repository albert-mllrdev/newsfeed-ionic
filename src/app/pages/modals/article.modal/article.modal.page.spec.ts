import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArticleModalPage } from './article.modal.page';

describe('Article.ModalPage', () => {
  let component: ArticleModalPage;
  let fixture: ComponentFixture<ArticleModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
