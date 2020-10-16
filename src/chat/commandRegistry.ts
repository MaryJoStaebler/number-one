import { Attention } from "./commands/attention";
import { Awesum } from "./commands/awesum";
import { AwesumRepo } from "./commands/awesumrepo";
import { Blog } from "./commands/blog";
import { Conduct } from "./commands/conduct";
import { Discord } from "./commands/discord";
import { GitHub } from "./commands/github";
import { Giving } from "./commands/giving";
import { Hardware } from "./commands/hardware";
import { Heroines } from "./commands/heroines";
import { Hype } from "./commands/hype";
import { Instagram } from "./commands/instagram";
import { POBox } from "./commands/pobox";
import { Project } from "./commands/project";
import { Stop } from "./commands/stop";
import { Theme } from "./commands/theme";
import { Website } from "./commands/website";
import { Wiki } from "./commands/wiki";
import { Command } from "./models/Command";

export abstract class CommandRegistry {
  private static commands: [Command?] = []

  public static init() {
    this.commands.push(new Command('attention', Attention))
    this.commands.push(new Command('awesum', Awesum))
    this.commands.push(new Command('awesumrepo', AwesumRepo))
    this.commands.push(new Command('blog', Blog))
    this.commands.push(new Command('conduct', Conduct))
    this.commands.push(new Command('discord', Discord))
    this.commands.push(new Command('github', GitHub))
    this.commands.push(new Command('giving', Giving))
    this.commands.push(new Command('hardware', Hardware))
    this.commands.push(new Command('heroines', Heroines))
    this.commands.push(new Command('hype', Hype))
    this.commands.push(new Command('instagram', Instagram))
    this.commands.push(new Command('pobox', POBox))
    this.commands.push(new Command('project', Project))
    this.commands.push(new Command('stop', Stop))
    this.commands.push(new Command('theme', Theme))
    this.commands.push(new Command('website', Website))
    this.commands.push(new Command('wiki', Wiki))
  }

  public static getCommand(commandName: string): Command | undefined {
    return this.commands.find(f => f.commandName === commandName)
  }
}