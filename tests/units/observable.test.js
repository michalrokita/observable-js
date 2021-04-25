const Observable = require('../../src/index').default

test('observable should implement subscribe method', () => {
    const observable = new Observable(subscriber => {})

    expect(typeof observable.subscribe).toBe('function')
})

test('observable\'s subscribe method should return an object', () => {
    const observable = new Observable(subscriber => {})

    expect(typeof observable.subscribe()).toBe('object')
})

test('object returned by subscribe should contain a unsubscribe function', () => {
    const observable = new Observable(subscriber => {})

    expect(typeof observable.subscribe()?.unsubscribe).toBe('function')
})

test('no hooks shall be called after complete or error functions are called', () => {
    let test1 = true
    let test2 = true

    const observable1 = new Observable(subscriber => {
        subscriber.complete()
        subscriber.next()
        subscriber.error()
    })

    observable1.subscribe({
        next: () => test1 = false,
        error: () => test1 = false
    })

    const observable2 = new Observable(subscriber => {
        subscriber.error()
        subscriber.next()
        subscriber.complete()
    })

    observable2.subscribe({
        next: () => test2 = false,
        complete: () => test2 = false
    })

    expect(test1 && test2).toBe(true)
})

test('hooks shouldn\'t be called after unsubscribed', done => {
    const observable = new Observable(subscriber => {
        subscriber.next(1)
        setTimeout(() => {
            subscriber.next(2)
            subscriber.complete()
        }, 200)
    })
    let wasCalled = false

    const observer = observable.subscribe({
        next: x => x === 2 && (wasCalled = true),
        complete: x => wasCalled = true
    })
    observer.unsubscribe()

    setTimeout(() => {
        expect(wasCalled).toBe(false)
        done()
    }, 400)
})

test('error hook should be called automatically when exception is thrown inside observable', () => {
    const observable = new Observable(() => {
        throw Error()
    })
    let error = false

    observable.subscribe({
        error: () => error = true
    })

    expect(error).toBe(true)
})

test('if a hook is missing inside a subscriber, no error should be emitted', () => {
    expect((() => {
        let observable = new Observable(subscriber => {
            subscriber.next()
            subscriber.complete()
        })
        observable.subscribe({})

        observable = new Observable(subscriber => {
            subscriber.next()
            subscriber.error()
        })
        observable.subscribe({})
    })()).toBeUndefined()

})

test('if no parameters are passed to subscribe, no error is emitted', () => {
    expect((() => {
        let observable = new Observable(subscriber => {
            subscriber.next()
            subscriber.complete()
        })
        observable.subscribe()

        observable = new Observable(subscriber => {
            subscriber.next()
            subscriber.error()
        })
        observable.subscribe()
    })()).toBeUndefined()
})

test('next should be called amount of times it is called inside an observable', () => {
    const observable = new Observable(subscriber => {
        subscriber.next()
        subscriber.next()
        subscriber.next()
        subscriber.next()
        subscriber.next()
    })
    let counter = 0

    observable.subscribe({
        next: () => ++counter
    })

    expect(counter).toBe(5)
})

test('you should be able to pass hooks as a list of functions', () => {
    const observable = new Observable(subscriber => {
        subscriber.next()
        subscriber.complete()
    })
    const observable2 = new Observable(subscriber => {
        subscriber.next()
        subscriber.error()
    })
    let counter = 0

    observable.subscribe(() => { ++counter }, () => { ++counter }, () => {})
    observable2.subscribe(() => { ++counter }, () => {}, () => { ++counter })
    observable.subscribe(() => { ++counter }, () => { ++counter })
    observable.subscribe(() => { ++counter })

    expect(counter).toBe(7)
})
