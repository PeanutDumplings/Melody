import { ColorResolvable, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { useMainPlayer } from "discord-player";
import config from "../../config";

export default {
    data: new SlashCommandBuilder().setName("lofi").setDescription("Applies the lofi effect to the current music.").setDMPermission(false),
    async execute(interaction) {
        const player = useMainPlayer();
        const queue = player.nodes.get(interaction.guild.id);

        const embed = new EmbedBuilder();
        embed.setColor(config.embedColour as ColorResolvable);

        if (!queue || !queue.isPlaying()) {
            embed.setDescription("There isn't currently any music playing.");
        } else {
            queue.filters.ffmpeg.toggle(["lofi"]);
            embed.setDescription(`The **lofi** filter is now ${queue.filters.ffmpeg.filters.includes("lofi") ? "enabled." : "disabled."}`);
        }

        return await interaction.reply({ embeds: [embed] });
    },
};
