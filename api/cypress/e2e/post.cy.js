describe('POST /api/users/register', () => {
  it('Deve cadastrar um novo usuário', () => {

    const user = {
      name: 'Diego Gmail',
      email: 'diego.felgueiras@gmail.com',
      password: 'Abc_123'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq('User successfully registered.')
      expect(response.body.user.id).to.match(/^[-]?\d+$/)
      expect(response.body.user.name).to.eq(user.name)
      expect(response.body.user.email).to.eq(user.email)
    })
  })

  it('Não deve cadastrar com email duplicado', () => {

    const user = {
      name: 'Diego Outlook',
      email: 'diego.felgueiras@outlook.com',
      password: 'Abc_123'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201)
    })

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(409)
      expect(response.body.error).to.eq('A user with this email already exists.')
    })
  })

  it('O campo nome deve ser obrigatório', () => {

    const user = {
      email: 'diego.felgueiras@teste.com',
      password: 'Abc_123'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('The \"name\" field is required.')
    })
  })

  it('O campo email deve ser obrigatório', () => {

    const user = {
      name: 'Diego Teste',
      password: 'Abc_123'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('The \"email\" field is required.')
    })
  })

  it('O campo senha deve ser obrigatório', () => {

    const user = {
      name: 'Diego Teste',
      email: 'diego.felgueiras@teste.com'
    }

    cy.postUser(user).then((response) => {
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

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('Invalid JSON format.')
    })
  })
})