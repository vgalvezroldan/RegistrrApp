import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { AuthService } from '../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['registerUser']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ RegisterPage ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    localStorage.clear();  // Limpia localStorage antes de cada prueba
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe existir el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe navegar a la página de inicio si el registro es exitoso', () => {
    authServiceMock.registerUser.and.returnValue(true);
    component.user.name = 'Test User';
    component.user.email = 'test@example.com';
    component.user.password = 'password123';

    component.register();

    expect(localStorage.getItem('isLoggedIn')).toBe('true');
    expect(localStorage.getItem('loggedInEmail')).toBe('test@example.com');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('debe mostrar un mensaje de error y no navegar si el registro falla', () => {
    authServiceMock.registerUser.and.returnValue(false); // Simula un fallo en el registro
    component.user.name = 'Test User';
    component.user.email = 'fail@example.com';
    component.user.password = 'password123';

    const consoleErrorSpy = spyOn(console, 'error'); // Espiar la función console.error

    component.register();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error en el registro. El correo electrónico ya está en uso.');
    expect(localStorage.getItem('isLoggedIn')).toBeNull();
    expect(localStorage.getItem('loggedInEmail')).toBeNull();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
