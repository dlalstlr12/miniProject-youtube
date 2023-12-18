const express = require('express')
const router = express.Router()

router.use(express.json())

let db =new Map()
var id = 1

router
    .route('/channels')
    .get((req,res)=>{//채널 전체 조회     
        var {userId} = req.body
        var channels = []

        if(db.size && userId){
            db.forEach(function(value, key){
                if(value.userId === userId){
                    channels.push(value)
                }
            })
            if(channels.length){
                res.status(200).json(channels)
            } else {
                notFoundChannel()
            }
        } else {
            notFoundChannel()
        }
    })
    .post((req,res)=>{//채널 개별 생성
        if(req.body.channelTitle){
            let channel = req.body
            db.set(id++,channel)

            res.status(201).json({
                message : `${db.get(id-1).channelTitle}채널 생성 되었습니다.`
            })
        } else {
            res.status(400).json({
                message : `요청 값을 제대로 보내주세요.`
            })
        }
        
    })
router
    .route('/channels/:id')
    .get((req,res)=>{//채널 개별 조회
        let {id} = req.params
        id = parseInt(id)
        
        var channel = db.get(id)
        if(channel){
            res.status(200).json(db.get(id))            
        }else {
            notFoundChannel()
        }
    })
    .put((req,res)=>{//채널 개별 수정
        let {id} = req.params
        id = parseInt(id)
        
        var channel = db.get(id)
        if(channel){
            var oldTitle = channel.channelTitle
            var newTitle = req.body.channelTitle

            channel.channelTitle = newTitle
            db.set(id, channel)
            res.status(200).json({
                messahe : `기존 ${oldTitle}에서 ${newTitle}로 정상적으로 수정되었습니다.`
            })
        }else {
            notFoundChannel()
        }
    })
    .delete((req,res)=>{//채널 개별 삭제
        let {id} = req.params
        id = parseInt(id)
        
        var channel = db.get(id)
        if(channel){
            res.status(200).json(de.get(id))            
        }else {
            notFoundChannel()
        }
    })

function notFoundChannel(){
    res.status(404).json({
        message : `채널 정보를 찾을 수 없습니다.`
    })
}

module.exports = router