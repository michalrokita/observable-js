# Observable.js [![Observables.rjs](https://github.com/michalrokita/observable-js/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/michalrokita/observable-js/actions/workflows/npm-publish.yml)
Observable implementation in vanilla ES6 JavaScript compatible with RxJs api.

## Usage

**Example.** The following is an Observable that pushes the values 1, 2, 3 immediately (synchronously) when subscribed, and the value 
4 after one second has passed since the subscribe call, then completes:
```js
import Observable from 'observables-rjs';

const observable = new Observable(subscriber => {
  subscriber.next(1)
  subscriber.next(2)
  subscriber.next(3)
  setTimeout(() => {
    subscriber.next(4)
    subscriber.complete()
  }, 1000)
})

observable.subscribe({
  next: x => console.log(x),
  complete: () => console.log('complete')
})
```
The code above executes as such on console:
```
00:00:00 --> 1
00:00:00 --> 2
00:00:00 --> 3
(waits for 1sec)
00:00:01 --> 1
00:00:01 --> 'complete'
```

### Unsubscribing from the observable
You can always unsubscribe from any further observable events by calling ```.unsubscribe()``` on the object returned by the ```.subscribe()``` method.
```js
import Observable from 'observables-rjs';

const observable = new Observable(subscriber => {
  subscriber.next(1)
  subscriber.next(2)
  setTimeout(() => {
    subscriber.next(4)
    subscriber.complete()
  }, 1000)
})

const observer = observable.subscribe({
  next: x => console.log(x),
  complete: () => console.log('complete')
})
observer.unsubscribe()

```
The code above executes as such on console:
```
00:00:00 --> 1
00:00:00 --> 2
```

### Error handling
When an error occurs inside a observable or subscriber.error() will be called, observable will be immediately unsubscribed by the observer and, 
if present, error hook will be called
```js
import Observable from 'observables-rjs';

const observable = new Observable(subscriber => {
  subscriber.next(1)
  subscriber.next(2)
  throw Error()
  subscriber.next(3)
})

observable.subscribe({
  next: x => console.log(x),
  error: () => console.log('error')
})

const observable2 = new Observable(subscriber => {
  subscriber.next(1)
  subscriber.next(2)
  subscriber.error()
  subscriber.next(3)
})

observable2.subscribe({
  next: x => console.log(x),
  error: () => console.log('error')
})
```
Both cases will resolve to the following console output:
```
--> 1
--> 2
--> 'error'
```
