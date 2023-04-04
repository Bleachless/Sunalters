    /**
     * @file All player constants.
     * @author João Rafael
     * @version 3.3.0
     */

    const colors = {
        // You can add more colors if you want
        red: 0xff0000,
        green: 0x44b868,
        blue: 0x0099ff,
        yellow: 0xffd500,
        orange: 0xff7f00,
        purple: 0x7f00ff,
        pink: 0xff007f,
        black: 0x000000,
        white: 0xffffff,
        grey: 0x808080,
        lightGrey: 0xd3d3d3,
        darkGrey: 0xa9a9a9,
        brown: 0xa52a2a,
        cyan: 0x00ffff,
        magenta: 0xff00ff,
        gold: 0xffd700,
    }
     
    // Here you can modify the text of the messages sent by the bot when a command is used. 
    const NO_QUEUE = {
        embeds: [
            {
              description: "Nothing is playing at the moment",
              color: `${colors.pink}`,
            },
          ],
          ephemeral: true,
        };
    
        const NO_CHANNEL_VOICE = {
            embeds: [
                {
                    description: "You need to be in a voice channel to use this command.",
                    color: `${colors.red}`, 
                },
            ],
            ephemeral: true,
        };
    
        const NOT_SAME_CHANNEL_VOICE = {
            embeds: [
                {
                    description: "You need to be in the same voice channel as me to use this command.",
                    color: `${colors.red}`,
                },
            ],
            ephemeral: true,
        };
    
        const QUEUE_STOPPED = {
            embeds: [
                {
                    description: "The music has been stopped.",
                    color: `${colors.blue}`,
                },
            ],
        };
    
        const ERROS = {
            embeds: [
                {
                    description: "An error has occurred, please try again later.",
                    color: `${colors.red}`,
                },
            ],
            ephemeral: true,
        }
        
        //QUEUE CLEAR
    
        const QUEUE_CLEAR = {
            embeds: [
                {
                    description: "The queue has been cleared.",
                    color: `${colors.blue}`,
                },
            ],
        }
    
        //QUEUE BACK
    
        const QUEUE_BACK = {
            embeds: [
                {
                    description: "Back to the previous song",
                    color: `${colors.blue}`,
                },
            ],
        }
    
        const QUEUE_BACK_ERROS = {
            embeds: [
                {
                    description: "Is not possible to go back to the previous song. Because there is no previous song in the queue.",
                    color: `${colors.blue}`,
                },
            ],
            ephemeral: true,
        }
    
    
        //QUEUE VOLUME
        const QUEUE_NOT_NUMBER = {
            embeds: [
                {
                    description: "Please enter a number.",
                    color: `${colors.blue}`,
                },
            ],
            ephemeral: true,
        }
    
        const QUEUE_ALREADY_VOLUME = {
            embeds: [
                {
                    description: "The volume is already at this level.",
                    color: `${colors.blue}`,
                },
            ],
            ephemeral: true,
        }
    
        const QUEUE_VOLUME_INVALID = {
            embeds: [
                {
                    description: "Please enter a number between 0 and 100.",
                    color: `${colors.blue}`,
                },
            ],
            ephemeral: true,
        }
    
    
        // QUEUE SKIP
        const QUEUE_NO_MORE_SONGS = {
            embeds: [
                {
                    description: "Not possible to skip the song, because there is no more songs in the queue.",
                    color: `${colors.blue}`,
                },
            ],
            ephemeral: true,
        }
        const QUEUE_SKIP = {
            embeds: [
                {
                    description: "Skipped the song.",
                    color: `${colors.blue}`,
                },
            ],
        }
    
    
        //QUEUE RESUME
        const QUEUE_PAUSED = {
            embeds: [
                {
                    description: "The music is already playing.",
                    color: `${colors.blue}`,
                },
            ],
            ephemeral: true,
        };
    
        const QUEUE_RESUME = {
            embeds: [
                {
                    description: "The music is now playing.",
                    color: `${colors.blue}`,
                },
            ],
        };
    
    
        //QUEUE PAUSE
        const QUEUE_PAUSE = {
            embeds: [
                {
                    description: "The music is now paused.",
                    color: `${colors.blue}`,
                },
            ],
        }
    
        const QUEUE_ALREADY_PAUSED = {
            embeds: [
                {
                    description: "The music is already paused.",
                    color: `${colors.blue}`,
                },
            ],
            ephemeral: true,
        };
    
    
        //DJ 
    
        const NOT_DJ = {
            embeds: [
                {
                    description: "This command is only for DJs, but no DJ role has been set. Please set a DJ role using the `/setdjrole` command.",
                    color: `${colors.red}`,
                },
            ],
            ephemeral: true,
        }
    
        const notSetDJ = {
            embeds: [
                {
                    description: "This command is restricted to DJs only, and as you are not a DJ, you do not have access to it.",
                    color: `${colors.red}`,
                },
            ],
            ephemeral: true,
        }
    
    
    
    
    module.exports = {
        NO_QUEUE,
        NO_CHANNEL_VOICE,
        NOT_SAME_CHANNEL_VOICE,
        QUEUE_PAUSED,
        QUEUE_STOPPED,
        ERROS,
        QUEUE_CLEAR,
        QUEUE_BACK,
        QUEUE_BACK_ERROS,
        QUEUE_NO_MORE_SONGS,
        QUEUE_SKIP,
        QUEUE_NOT_NUMBER,
        QUEUE_ALREADY_VOLUME,
        QUEUE_VOLUME_INVALID,
        QUEUE_RESUME,
        QUEUE_PAUSE,
        QUEUE_ALREADY_PAUSED,  
        NOT_DJ,
        notSetDJ,
    };