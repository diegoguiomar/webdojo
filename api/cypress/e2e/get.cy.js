describe('GET api/users', () => {

    const heroes = [
        {
            name: "Bruce Wayne",
            email: "bruce.wayne@justiceleague.com",
            password: "Abc_123"
        },
        {
            name: "Clark Kent",
            email: "clark.kent@justiceleague.com",
            password: "Abc_123"
        },
        {
            name: "Diana Prince",
            email: "diana.prince@justiceleague.com",
            password: "Abc_123"
        },
        {
            name: "Barry Allen",
            email: "barry.allen@justiceleague.com",
            password: "Abc_123"
        },
        {
            name: "Arthur Curry",
            email: "arthur.curry@justiceleague.com",
            password: "Abc_123"
        }
    ]

    before(() => {
        heroes.forEach((hero) => {
            cy.postUser(hero)
        })
    })

    it('Deve retornar uma lista de usuários', () => {
        cy.getUsers().then((response) => {
            expect(response.status).to.eq(200)

            heroes.forEach((hero) => {
                const found = response.body.find((user) => user.email === hero.email)
                expect(found.email).to.eq(hero.email)
                expect(found.name).to.eq(hero.name)
                expect(found).to.have.property('id')
            })
        })
    })
})