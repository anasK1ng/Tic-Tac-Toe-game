import Player from "./Class/Player.js"

export default class Item 
{
    static Items = new Array(9).fill(new Item(null,null))
    constructor(Target,Table,Round)
    {
        this.Id = null
        this.Target = Target
        this.Table = Table
        this.Checked = false
        this.Round = Round
        this.Player = null
        this.Index
        if(this.Table != null)
        {
            this.Index = Array.from(Table).indexOf(this.Target)
            Item.Add(this)  
        }            
    }
    
    Set(player)
    {
        this.Player = player
        this.Checked = true
        this.Update()
        this.SetData()
    }
    static Add(item)
    {
        if (item instanceof Item)
        {
            item.Update()
        }
    }
    
    Update()
    {
        Item.Items.splice(this.Index,1)
        Item.Items.splice(this.Index, 0, this)  
    }

    static List()
    {
        return Item.Items
    }

    static Get(target)
    {
        for(var i = 0; i < Item.Items.length ; i++)
        {
            if(Item.Items[i].Target == target)
            {
                return Item.Items[i]
            }
        }     
    }
    
    SetData()
    {
        var symbloClass = this.Player.SymbolClass ?? ""
         var symbol = this.Player.Symbol ?? ""
        if(symbloClass == "")
        { 
            this.Target.classList.remove('o__icon','x__icon')
        }
        else
        {
            this.Target.classList.add(symbloClass)
        }
        this.Target.setAttribute("Checked",this.Checked)
        this.Target.innerHTML = symbol
    }
    
    static GetByIndex(index)
    {                    
        for(var i = 0; i < Item.Items.length ; i++)
        {
            if(Item.Items[i].Index == index)
            {
                return Item.Items[i]
            }
        }  
    }

    static Refrech()
    {
        Item.Items.forEach(item => {
            item.Checked = false 
            item.Player = new Player()
            item.SetData()
        })
    }
    static GetRandomNonCheckedItem()
    {
        var nonCheckedItems = Item.Items.filter(player => !player.Checked)
        var index = Math.floor(Math.random() * nonCheckedItems.length)
        return nonCheckedItems[index]
    }
}