import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data:{
            name: "Bolao do Joaozao de teste",
            email: "johndoes@gmail.com",
            avatarUrl: "https://github.com/matheusmartini.png",
        }
    })
    const pool = await prisma.pool.create({
        data:{
            title: "Teste do bolao com data",
            code: "BOLBOL",
            ownerId: user.id,
            
            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data:{
            date:"2022-11-15T12:00:00.955Z",
            firstTeamCountryCode:"BR",
            secondTeamCountryCode:"DE",
        }
    })

    await prisma.game.create({
        data:{
            date:"2022-11-15T12:00:00.955Z",
            firstTeamCountryCode:"BR",
            secondTeamCountryCode:"AR",

            guesses:{
                create:{
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant: {
                        connect:{
                            userId_poolId:{
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })

}

main()