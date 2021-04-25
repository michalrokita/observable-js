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

        if (!Array.isArray(observer)) {
            observer = []
        }

        const [next, complete, error] = [0, 1, 2].map(hookIndex => Observable.#getIfFnEmptyFnOtherwise(observer[hookIndex]))

        return {
            next,
            complete,
            error
        }
    }

    #createSubscription(observer) {
        let subscription
        let subscribed = true

        const unsubscribe = () => {
            subscribed = false
            subscription = null
        }

        subscription = {
            unsubscribe,
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

        return subscription
    }

    /**
     *
     * @param observer
     * @returns {{unsubscribe: (function(): boolean), wrappedObserver: {next: (function(...[*])), complete: wrappedObserver.complete, error: wrappedObserver.error}}}
     */
    #wrapObserver(observer) {
        observer = Observable.#parseObserver(observer)

        return this.#createSubscription(observer)
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
