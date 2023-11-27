import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { AuthService } from '../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authServiceMock: any;
  let routerMock: any;
  let alertControllerSpy: any;

  beforeEach(waitForAsync(() => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['login', 'getUserByEmail', 'isProfessor']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);

    TestBed.configureTestingModule({
      declarations: [LoginPage],
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
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería navegar a la página de profesor si el usuario es profesor', async () => {
    authServiceMock.login.and.returnValue(true);
    authServiceMock.isProfessor.and.returnValue(true);
    authServiceMock.getUserByEmail.and.returnValue({ name: 'Profesor' });
    component.user.email = 'profesor@duocuc.cl';
    component.user.password = 'password';

    await component.login();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/profesor']);
  });

  it('debería navegar a la página de alumno si el usuario no es profesor', async () => {
    authServiceMock.login.and.returnValue(true);
    authServiceMock.isProfessor.and.returnValue(false);
    authServiceMock.getUserByEmail.and.returnValue({ name: 'Alumno' });
    component.user.email = 'alumno@duocuc.cl';
    component.user.password = 'password';

    await component.login();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/alumno']);
  });

  it('debería mostrar una alerta si el inicio de sesión falla', async () => {
    authServiceMock.login.and.returnValue(false);
    component.user.email = 'usuario@ejemplo.com';
    component.user.password = 'password';

    const alert = jasmine.createSpyObj('HTMLIonAlertElement', ['present']);
    alertControllerSpy.create.and.returnValue(Promise.resolve(alert));

    await component.login();

    expect(alertControllerSpy.create).toHaveBeenCalled();
    expect(alert.present).toHaveBeenCalled();
  });

  // Aquí puedes agregar más pruebas según sea necesario
});
