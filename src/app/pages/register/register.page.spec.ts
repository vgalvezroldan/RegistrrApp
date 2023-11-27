import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { AuthService } from '../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let authServiceMock: any;
  let routerMock: any;
  let alertControllerSpy: any;

  beforeEach(waitForAsync(() => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['registerUser']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);

    TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: AlertController, useValue: alertControllerSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('el componente debe existir', () => {
    expect(component).toBeTruthy();
  });

  it('debe navegar a la página de profesor si el registro es exitoso', () => {
    authServiceMock.registerUser.and.returnValue(true);
    component.user.name = 'Test User';
    component.user.email = 'test@correo.com';
    component.user.password = 'password123';

    component.register();

    expect(localStorage.getItem('isLoggedIn')).toBe('true');
    expect(localStorage.getItem('loggedInEmail')).toBe('test@correo.com');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/profesor']);
  });

  it('debe mostrar un mensaje de error y no navegar si el correo electrónico ya está en uso', async () => {
    authServiceMock.registerUser.and.returnValue(false);
    component.user.name = 'Test User';
    component.user.email = 'existing@example.com';
    component.user.password = 'password123';

    const alert = jasmine.createSpyObj('HTMLIonAlertElement', ['present']);
    alertControllerSpy.create.and.returnValue(Promise.resolve(alert));

    await component.register();

    expect(alertControllerSpy.create).toHaveBeenCalled();
    expect(alert.present).toHaveBeenCalled();
    expect(localStorage.getItem('isLoggedIn')).toBeNull();
    expect(localStorage.getItem('loggedInEmail')).toBeNull();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
