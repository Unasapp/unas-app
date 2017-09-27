import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(users: any, term: any): any {
    // check if search term is undefinedg
    if(term === undefined) return users;
    // return updated users array
    return users.filter(function(user){
      return user.c_first.toLowerCase().includes(term.toLowerCase())
    })
  }
}
