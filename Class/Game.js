import Player from "./Player.js"
import Item  from "../Item.js"
import {toTop,PassInfo,Round} from "../Xoscript.js"
import { AnotherGame } from "../Buttons.js"
import('../Buttons.js')
export default class Game{
    constructor(NumeroGame){
        this.NumeroGame = NumeroGame
        this.Wins= [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
        this.Finish = false
        this.Plays = 0
        
        this.Table= document.querySelector('.game')
        this.TableItem = document.querySelectorAll('.game .item') 
        this.congralateSection = document.querySelector('.tooltip')
        this.PlayerProfiles = document.querySelectorAll('.player') 
        this.Load()
    }

    Load()
    {
        var player
        var item
        this.TableItem.forEach(item => {
            item.addEventListener('click',(e)=>{
                 player = Player.GetPlayerHasRole()
                 item = Item.Get(e.target)
                if(!this.Finish && !item.Checked && !player.Robot)
                {
                    player.Play(e.target)
                }
            })
        });
        this.InstialiseItems()

        this.RobotPlay()      
        
    }
    InstialiseItems()
    {
        this.TableItem.forEach(item =>
        {
            new Item(item,this.TableItem,this)
        });        
    }
    UpdatePlays()
    {
        this.Plays++
    }

    TurnFinish()
    {
        this.Finish = false
    }

    static Get()
    {
        return Round
    }
    // Check if game ended
    Check()
    {
        for(let i = 0 ; i < this.Wins.length ; i++)
        {
            var listCheck = new Array();
            for (let l = 0; l < this.Wins[i].length; l++) 
            {
                var symbol = l
                var index = this.Wins[i][l]
                var item = Item.GetByIndex(index)
                if(item.Player != null)
                    if(item.Player.Symbol != null)
                        symbol = item.Player.Symbol
                listCheck.push(symbol)
            }
            if((new Set(listCheck)).size==1)
            {   
                this.Finish = true
                this.Plays = 0
                this.FinishGame()
                return
            }
        }
    }
    // testing if some of players wins 
    Test()
    {
        if(this.Plays>=5)
        {
            this.Check()              
        }
        if(this.Plays=== 9)
        {
            setTimeout(()=> {
                Item.Refrech()
                Player.Players.forEach(player => player.UpdateScore())
                this.Plays = 0
            ,2000})
        }

        this.SwitchRoles()
        PassInfo()
        setTimeout(()=> {
            this.RobotPlay()
        },2200)

    }
    //Giving the role to other player for he play 
    SwitchRoles()
    {
        var role =  Player.List()[0].Role
        Player.List()[0].Role =  Player.List()[1].Role
        Player.List()[1].Role = role
    }
    
    FinishGame(){

        var player = Player.GetPlayerHasRole()
        
       
        var congralateContainer =   `<div class="congrlate__container section ">
                                            <h3 class="congrlate__header"><span  style="color: #005B4F;" class="player__congrate ${player.SymbolClass}">player ${player.Name} <span class="congrate__symbol">${player.Symbol}</span> had win</span></h3>
                                            <h2 class="congrlate__text"> <span class="congrlate__icon"></span></h2>
                                            <div class="btn btn__play__again">Play again</div>
                                            <div class="btn btn__back">Go back  to loby</div>
                                    </div>`

        
        this.congralateSection.innerHTML = congralateContainer
        this.congralateSection.classList.remove('display')
        this.congralateSection.querySelector('.btn__play__again').addEventListener('click',AnotherGame)
        this.congralateSection.querySelector('.btn__back').addEventListener('click',toTop)

        player.UpdateScore()
        

    }

    RobotPlay()
    {
        
        if(Player.CheckRobot() && Player.GetPlayerHasRole().Robot && !this.Finish)
        {
            var player = Player.GetPlayerHasRole()
            var item = Item.GetRandomNonCheckedItem()
            player.Play(item.Target)
        }
    }

    Refrech()
    {
        Item.Refrech()
        // var casesSelected = document.querySelectorAll('.game .item[symbol]')
        // casesSelected.forEach(cases => {
        //     cases.removeAttribute('symbol')
        //     cases.innerHTML =""
        //      if(cases.classList.contains('x__icon') )
        //       cases.classList.remove("x__icon")
        //       else
        //       cases.classList.remove("o__icon")   
        // })
        this.congralateSection.classList.add('display')
    }
    
}