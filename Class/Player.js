import Item from "../Item.js";

export default class Player
{  
    static Players = [];
    static RoleSuggestion = [true,false]

    constructor(Id=null ,Name = null,Symbol = null,SymbolClass = null,Robot,Game)
    {
        this.Id = Id;
        this.Name = Name;
        this.SymbolClass = SymbolClass;
        this.Symbol = Symbol;
        this.Game = Game;
        this.Role =  Player.RandomRole()
        this.Robot = Robot
        this.Score = 0
        if(Player.RoleSuggestion.length  == 0)
        {
                Player.RoleSuggestion = [true,false]
        }
        if(this.Id != null)
        {
            if(Player.List().length == 2)
            {
                Player.RemoveAllPlayers()
            }
            
            Player.Add(this)
        }
    }
    //Get the player by Id 
    static Get(Id)
    {
        for(var i = 0; i < this.Players.length; i++)
        {
            if(Player.Players[i].Id === Id)
            {
                return Player.Players[i]
            }
        }
    }
    //Return list of players
    static List()
    {   
        return Player.Players;
    }
    //
    Play(target)
    {
            this.Game.UpdatePlays()
            Item.Get(target).Set(this)
            this.Game.Test()
    }
    //Adding a player to List of players
    static Add(player)
    {
        if (player instanceof Player)
        {
            this.Players.push(player)
        }
    }
    //Intialise the list of players  
    static RemoveAllPlayers()
    {
        this.Players = new Array()
    }
    //Get random role between two value True or False
    static RandomRole()
    {
        var index,role ,lenght = Player.RoleSuggestion.length
        if(lenght == 1)
        {
            role = Player.RoleSuggestion[0]       
        }
        else
        {
            index = Math.round(Math.random())
            role = Player.RoleSuggestion[index]
        }
        Player.RoleSuggestion.splice(index,1)
        return  role
    }   
    //Return a player that his role equal true
    static GetPlayerHasRole()
    {
        for(var i = 0; i < this.Players.length ; i++)
        {
            if(Player.Players[i].Role)
            {
                return Player.Players[i]
            }
        }
    }
    //Increase Score of a player after winning
    UpdateScore()
    {
        this.Score++ 
    }

    SetRobotMode()
    {
        this.Robot = true 
    }
    static CheckRobot()
    {
        // console.log(Player.Players)
        for(var i = 0 ; i < Player.Players.length ; i++)
        {
            if(Player.Players[i].Robot)
            {
                return true
            }
        }
        return false
    }
}
