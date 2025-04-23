import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from './storage.service';

export const authGuard: CanActivateFn = (route, state) => {

  const storage = inject(StorageService);
  const router = inject(Router);

  if(storage.getDataFromLocalStorage('token') == null){
    router.navigate(['/login']);
    return false;
  }

  return true;
};
