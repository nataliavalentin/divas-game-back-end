const { connect } = require('./DivasRepository')
const DivasModel = require('./DivasSchema')

connect()

const getAll = async() => {
    return DivasModel.find((error, usuario) => {
        return usuario
    })
}

const getById = (id) => {
    return DivasModel.findById(id)
}

const add = async(usuario) => {
    const novaDiva = new DivasModel(usuario)
    return novaDiva.save()
}

const remove = (id) => {
    return DivasModel.findByIdAndDelete(id)
}

const update = (id, usuario) => {
    return DivasModel.findByIdAndUpdate(
        id, { $set: usuario }, { new: true },
    )
}

const login = async(dadosDoLogin) => {
    const divaEncontrada = await DivasModel.findOne({ username: dadosDoLogin.username })

    if (divaEncontrada) {
        const senhaCorreta = bcrypt.compareSync(
            dadosDoLogin.senha, divaEncontrada.senha
        )

        if (senhaCorreta) {
            const token = jwt.sign({
                    username: divaEncontrada.username,
                    id: divaEncontrada._id
                },
                process.env.PRIVATE_KEY, { expiresIn: 60 }
            )
            return { auth: true, token };
        } else {
            throw new Error('Senha incorreta, prestenção parça')
        }
    } else {
        throw new Error('Email não está cadastrado')
    }
}

const pontos = async() => {
    return DivasModel.find({}, "ponto", (error, usuario) => {
        return usuario
    })
}

module.exports = { getAll, getById, add, remove, update, login, pontos }