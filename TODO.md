### Might worth discussing but this is what I got so far.

- [ ] - Refactor `vitalimApi.ks`, not sure about the rest of the team, but auth handling and fetching data seems to be very complicated including error handling and dispatching of actions.
- [ ] - implement logger `bunyan` or eqvivalent
- [ ] - refactor reducers
- [ ] - dump and load states from local storage, at the moment just tokens
- [ ] - change approach the way we group tokens by fetch functions, object sorted by ids or types rather than just array. this will help us to reduce the number of iterations
- [ ] - implement unit testing? - something simple with jest
- [ ] - update eslint and prettier to be a little more forgiven and start using prittier as pre commit hook
- [ ] - move redux store to a separate file as it starts to grow bigger
- [ ] - go through all *TODO* comments