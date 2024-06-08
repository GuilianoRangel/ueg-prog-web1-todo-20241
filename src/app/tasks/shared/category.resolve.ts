/* tslint:disable:no-redundant-jsdoc */
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {CategoryService} from "./category.service";

/**
 * Classe resolve responsável pela busca das informações de Usuário conforme o id.
 *
 * @author Guiliano Rangel (UEG)
 */
@Injectable({
  providedIn: 'root'
})
export class CategoryResolve implements Resolve<any> {

  /**
   * Construtor da classe.
   *
   * @param router
   * @param service
   */
  constructor(
    private router: Router,
    private service: CategoryService
  ) {
  }

  /**
   * Realiza a consulta por id de Usuário.
   *
   * @param route
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {

    return new Observable(observer => {
      this.service.getAll().subscribe(
        {
          next: data => {
            observer.next(data);
            observer.complete();
          },
          error: error => {
            observer.error(error);
            this.router.navigate(['']);
          }
        });
    });
  }
}
