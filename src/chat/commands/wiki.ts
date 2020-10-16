import { OnCommandEvent, OnSayEvent } from "../../models"
import { EventBus, Events } from "../../events"
import { ShouldThrottle } from '../shouldThrottle'
import { LogLevel, log } from '../../common';
import axios, { AxiosResponse } from 'axios'

/**
 * Sends a message to chat with info from WikiPedia
 * @param onCommandEvent 
 */
export async function Wiki(onCommandEvent: OnCommandEvent) {

  const cooldownSeconds = 30

  // The broadcaster is allowed to bypass throttling. Otherwise,
  // only proceed if the command hasn't been used within the cooldown.
  if (!onCommandEvent.flags.broadcaster &&
    ShouldThrottle(onCommandEvent.extra.sinceLastCommand, cooldownSeconds, true)) {
    return
  }

  let wikiPediaEndPointURL = `https://en.wikipedia.org/api/rest_v1/page/summary/${onCommandEvent.message}`

  log(LogLevel.Info, `Wiki: Message = ${onCommandEvent.message}`);
  let message = `Who knows... google it.`

  try 
  {
    let response = await axios.get(wikiPediaEndPointURL,{
      validateStatus: function (status) {
        return status < 500; 
      }
    });
    if(response.status == 404)
    {
      wikiPediaEndPointURL = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${onCommandEvent.message}&format=json`
  
      let response = await axios.get(wikiPediaEndPointURL);
      if(response.data.query.search.length > 0){
        message = response.data.query.search[0].snippet.replace(/(<([^>]+)>)/gi, "");;
      }
    } else {
      message = response.data.extract;
    }

  } catch(err){
    log(LogLevel.Error, `Wiki: ${err}`);
  }

    // Send the message to Twitch chat
  EventBus.eventEmitter.emit(Events.OnSay, new OnSayEvent(message))

}