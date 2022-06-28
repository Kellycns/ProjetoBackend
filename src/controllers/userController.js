import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt  from "jsonwebtoken"

class AuthenticationController {

    static createToken(param) {
        return jwt.sign(param, process.env.API_SECRET)
    }

    static userRegister = async(request, response) => {
        const {email, name, password} = request.body

        const possibleUser = await User.findOne({email})
        if(possibleUser)
        return response.status(400).send({error: "Usuáro com e-mail já cadastrado!"})

        const user = await User.create({email, name, password})
        user.password = undefined;
        return response.status(200).send({"message": "Usuário cadastrado com sucesso!", user})
    }

    static user = async(req, res) => {
        const {email, password} = req.body;

        const user = await User.findOne({email}).select("+password");
        if(!user)
            return res.status(400).send({error:"Usuário não encontrado"});

        const passwordConfirm = await bcrypt.compare(password, user.password);

        if(!passwordConfirm)
            return res.status(400).send({error:"A senha é inválida"});
        
        user.password = undefined
        return res.send({
            user,
            token: this.createToken({id: user.id})
        })
    }
}

export default AuthenticationController;