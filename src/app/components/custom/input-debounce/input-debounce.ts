import { Component, input, OnDestroy, OnInit, output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'input-debounce',
  imports: [],
  template: `
  <input
    class="search-input"
    type="text"
    placeholder="Ingrese su busqueda..."
    #input
    (input)="onInput(input.value)"
  />`,
  styles: [`
  .search-input {
    padding: 8px 12px;
    border-radius: 8px;
    border: none;
    outline: none;
    background: #333;
    color: white;
    width: 220px;
    max-width: 100%;
  }

  .search-input::placeholder {
    color: #bbb;
  }

  @media(max-width: 1000px){
    .search-input {
      width: 100%;
    }
  }
`]
})
export class InputDebounce implements OnInit, OnDestroy{
  private debouncer: Subject<string> = new Subject<string>();
  private debouncer$?: Subscription;

  public onDebouce = output<string>();

  ngOnInit(): void {
    this.debouncer$ = this.debouncer
      .pipe(
        debounceTime(500)
      ).subscribe(value => {
        this.onDebouce.emit(value)
      });
  }

  ngOnDestroy(): void {
    this.debouncer$?.unsubscribe();
  }

  onInput(value: string) {
      this.debouncer.next(value);
  }
}
