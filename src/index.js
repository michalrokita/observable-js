export default class Observable {

    #observable

    /**
     *
     * @param observable
     */
    constructor(observable) {
        this.#observable = observable || (() => {})
    }

    /**
     *
     * @param object
     * @returns {(function())|*}
     */
    static #getIfFnEmptyFnOtherwise(object) {
        if (typeof object === 'function') {
            return object
        }

        return () => {}
    }

    /**
     *
     * @param observer
     * @returns {{next: (*|(function())), complete: (*|(function())), error: (*|(function()))}|*}
     */
    static #parseObserver(observer) {
        if (observer.length === 1 && typeof observer[0] !== 'function') {
            return {
                next: Observable.#getIfFnEmptyFnOtherwise(observer[0].next),
                complete: Observable.#getIfFnEmptyFnOtherwise(observer[0].complete),
                error: Observable.#getIfFnEmptyFnOtherwise(observer[0].error)
            }
        }

        return {
            next: Observable.#getIfFnEmptyFnOtherwise(observer[0]),
            complete: Observable.#getIfFnEmptyFnOtherwise(observer[1]),
            error: Observable.#getIfFnEmptyFnOtherwise(observer[2])
        }
    }

    /**
     *
     * @param observer
     * @returns {{unsubscribe: (function(): boolean), wrappedObserver: {next: (function(...[*])), complete: (function(...[*])), error: (function(...[*]))}}}
     */
    #wrapObserver(observer) {
        let subscribed = true
        observer = Observable.#parseObserver(observer)

        return {
            unsubscribe: () => subscribed = false,
            wrappedObserver: {
                next: (...args) => subscribed && observer.next.call(null, ...args),
                complete: (...args) => {
                    if (subscribed) {
                        subscribed = false
                        observer.complete.call(null, ...args)
                    }
                },
                error: (...args) => {
                    if (subscribed) {
                        subscribed = false
                        observer.error.call(null, ...args)
                    }
                }
            }
        }
    }

    /**
     *
     * @param observer
     * @returns {{unsubscribe: (function(): boolean)}}
     */
    subscribe(...observer) {
        const { wrappedObserver, unsubscribe } = this.#wrapObserver(observer)

        try {
            this.#observable.call(null, wrappedObserver)
        } catch (exception) {
            wrappedObserver.error.call(null, exception)
        }

        return {
            unsubscribe
        }
    }

}
