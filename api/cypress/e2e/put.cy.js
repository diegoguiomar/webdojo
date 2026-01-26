describe('PUT /api/users/:id', () => {

    context('Atualziação', () => {
        let userId

        const originalUser = {
            name: 'Peter Parker',
            email: 'parker@stark.com',
            password: '123456'
        }

        const updatedUser = {
            name: 'Spiderman',
            email: 'spider@stark.com',
            password: 'Abc_123'
        }

        before(() => {
            cy.task('deleteUser', originalUser.email)
            cy.task('deleteUser', updatedUser.email)

            cy.postUser(originalUser).then(response => {
                cy.log(response.body.user.id)
                userId = response.body.user.id
            })
        })

        it('Deve atualizar um usuário existente', () => {
            cy.putUser(userId, updatedUser).then((response) => {
                expect(response.status).to.eq(204)
            })
        })

        after(() => {
            cy.getUsers().then((response) => {
                const spider = response.body.find(user => user.id === userId)
                expect(spider).to.exist
                expect(spider.name).to.eq(updatedUser.name)
                expect(spider.email).to.eq(updatedUser.email)
            })
        })
    })

    context('Quando o id não existe', () => {
        let userId

        const originalUser = {
            name: 'Tony Stark',
            email: 'tony@stark.com',
            password: '123456'
        }

        const updatedUser = {
            name: 'Ironman',
            email: 'ironman@marvel.com',
            password: 'Abc_123'
        }

        before(() => {
            cy.task('deleteUser', originalUser.email)
            cy.task('deleteUser', updatedUser.email)

            cy.postUser(originalUser).then((response) => {
                cy.log(response.body.user.id)
                userId = response.body.user.id
            })

            cy.task('deleteUser', originalUser.email)
        })

        it('Deve retornar 404 e user not found', () => {
            cy.api({
                method: 'PUT',
                url: 'http://localhost:3333/api/users/' + userId,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: updatedUser,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)
                expect(response.body.error).to.eq('User not found.')
            })
        })
    })

    context('Campos obrigatórios', () => {
        it('O campo nome deve ser obrigatório', () => {

            const user = {
                email: 'diego.felgueiras@teste.com',
                password: 'Abc_123'
            }

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eq('The \"name\" field is required.')
            })
        })

        it('O campo email deve ser obrigatório', () => {

            const user = {
                name: 'Diego Teste',
                password: 'Abc_123'
            }

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eq('The \"email\" field is required.')
            })
        })

        it('O campo senha deve ser obrigatório', () => {

            const user = {
                name: 'Diego Teste',
                email: 'diego.felgueiras@teste.com'
            }

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eq('The \"password\" field is required.')
            })
        })

        it('Não deve passr quando o JSON está mal formatado', () => {

            const user = `{
                name: 'Diego Teste',
                email: 'diego.felgueiras@teste.com'
                password: 'Abc_123'
            }`

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eq('Invalid JSON format.')
            })
        })
    })
})