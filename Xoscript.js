//test
import  Player  from "./Class/Player.js";
import  Game  from "./Class/Game.js";
var FirstPlayer = new Player()
var SecondPlayer = new Player()
var RobotMode = false
export var Round 

const startContainer = document.querySelector('.start')




var btnsCheck = document.querySelectorAll('.symbol .symbole__check')
btnsCheck.forEach(item=>{
    item.addEventListener('click', ()=>{
        if(!item.classList.contains('checked')){
            
            var checkedItem = item.closest('.symbol').querySelector('.checked')
            
            checkedItem.classList.remove('checked')
            checkedItem.removeAttribute('checked')
           
            item.classList.add('checked')
            var inputName=item.closest('.symbol').parentElement.querySelector('.name__input')
            inputName.setAttribute('symbole', item.textContent.toUpperCase())
            changeCheck(item)
        }
        
    })
})
function changeCheck(item){
    var secondPlayer = item.closest('.score__container').querySelector('.symbol .symbole__check')
    
}







const InfoPlayerContainer = document.querySelector('.score__container')
const btnPlayPc = document.querySelector('.btn__pc')
const btnPlayPlayer = document.querySelector('.btn__player')
const userIcon = document.querySelector('.second__player__profile .player__icon .bxs-user')
const pcIcon = document.querySelector('.second__player__profile .player__icon .bx-ghost')
const scoreSection = document.querySelectorAll('.gamer__profile')
btnPlayPc.addEventListener('click',()=>{
    RobotMode = true 
    scoreSection[1].classList.add('hide')
    userIcon.classList.add('hide')  
    pcIcon.classList.remove('hide')
    InfoPlayerContainer.scrollIntoView()
})
btnPlayPlayer.addEventListener('click',_=>{
    scoreSection[1].classList.remove('hide')
    pcIcon.classList.add('hide')
    userIcon.classList.remove('hide')  
    InfoPlayerContainer.scrollIntoView()
})


const btnReturnToHome = document.querySelector('.btn__comeback-home')
const startSection = document.querySelector('.start')
btnReturnToHome.addEventListener('click',()=>{
    startSection.scrollIntoView(true)
})

const btnPlay = document.querySelector('.btn__play')
const playSection = document.querySelector('main')

// button Play
btnPlay.addEventListener('click',()=>{
     var NumeroGame = new Date()
    Round = new Game(NumeroGame)
    if(setUp() == true)
    {
        alert('Please Enter your name')
        return
    }
     PassInfo()
    //  setInterval(2000)

    //  window.scrollBy(0,900);
     playSection.scrollIntoView(true)
     Round.Load()
    })
// check if there if the user fill the boxes name
function setUp(){
    return getData();
}
// get informations of players from information section
function getData(){
    var error = false
    var profile = document.querySelectorAll('.gamer__profile:not(.hide)')
    
    
    var players = [FirstPlayer,SecondPlayer]
    for(let i = 0 ;i < profile.length ; i++){
        
        let Name = profile[i].querySelector('.name__input').value ,
        Id = Name + Round.Id ,
        Symbol =profile[i].querySelector('.symbol .checked').getAttribute('symbol'),
        SymbolClass = profile[i].querySelector('.symbol .checked').getAttribute('symbolClass')

        if(Name=="")
            return true
        players[i] = new Player(Id,Name,Symbol,SymbolClass,false,Round) 
    }
    if(RobotMode)
    {
        var playerOne = Player.List()[0]
        var symbol = playerOne.Symbol.toUpperCase()
        var symbloClass = playerOne.SymbolClass
        if(symbol == "X")
        {
            symbol = "O"
            symbloClass = "o__icon"
        }
        SecondPlayer = new Player("Robot"+Round.Id,"Robot",symbol,symbloClass,true,Round)
    }
    return error
}
// pass informations of players from informations section to Game Section
export function PassInfo(){

    var playersProfile  = document.querySelectorAll('.player')
    for(let i = 0 ; i < Player.Players.length ; i++){
        let Id = Player.Players[i].Id
        playersProfile[i].setAttribute('Id',Id)

        let Name = Player.Players[i].Name
        playersProfile[i].querySelector('.player__name').innerHTML = Name

        let symbol =playersProfile[i].querySelector('.player__icon').querySelector('.symbol__dashbord')
        
        symbol.classList.remove('x__icon')
        symbol.classList.remove('o__icon')
        
        let SymbolClass = Player.Players[i].SymbolClass;
        symbol.classList.add(SymbolClass)

        let Symbol = Player.Players[i].Symbol;
        symbol.setAttribute('symbol',Symbol)
        symbol.innerHTML = Player.Players[i].Symbol
        
        let Role = Player.Players[i].Role;
        playersProfile[i].setAttribute('role',Role)
        
        let Score =  Player.Players[i].Score;
        playersProfile[i].querySelector('.player__score').innerHTML = Score
      }  
    
}

// UserRobot()
// {

// }

export function PlayAgain(){
    
    Round.Refrech();
    Round.TurnFinish()
   
}
export function toTop(){
    Round.Refrech();
    window.scrollTo(0,0);
    
}
window.scrollTo(0,0);

