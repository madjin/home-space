var isJanusWeb = (typeof elation != 'undefined');
var highlight_timer = 0.0;
var highlight_timer_2 = 0.0;
var click_timer = 0;
var radio_gain_max = 1;

room.onLoad = function()
{
	var radio = room.objects['radio_sound'];
	if (radio)
	{
		if (radio.gain > 0)
		{
			radio_gain_max = radio.gain;
		}
	}
}

// note to James
// this function is the part that triggers multiple times
// it should only log 1 time on click, I'm getting one per each script in the room.
function radio_click()
{
	//console.log('radio_click()');
	// don't cange if clicked rapidly
	if (click_timer > 0)
	{
		return;
	}
	var radio = room.objects['radio_sound'];
	var mute = room.objects['radio_mute'];
	if (radio)
	{
		click_timer = 0.2;
		radio.gain = (radio_gain_max - radio.gain);
		if (mute)
		{
			if (radio.gain == 0)
			{
				mute.visible = true;
			}
			else
			{
				mute.visible = false;
			}
		}
	}
}

room.update = function(dt)
{
	if (click_timer > 0)
	{
		click_timer -= dt * 0.001;
	}
	// hover/highlighting portion
	var highlight = room.objects['radio_control_highlight'];
	var radio_control = room.objects['radio_control'];
	if (radio_control && highlight && player.cursor_object == 'radio_control')
	{
		highlight_timer -= dt * 0.001;
		highlight_timer_2 += dt * 0.001;
		if (highlight_timer <= 0)
		{
			highlight_timer += 1/30;
			scale_base = radio_control.scale.x;
			highlight_maxsize = radio_control.scale.x*0.025
			highlight.scale = V(0.01+scale_base+highlight_maxsize+highlight_maxsize*Math.sin(highlight_timer_2*5));
			//highlight.visible = !highlight.visible;
		}
		if (isJanusWeb && highlight.visible)
		{
			var mute = room.objects['radio_mute'];
			if (highlight.visible)
			{
				highlight.setOpacity(0.4+Math.sin(highlight_timer_2)*0.0001);
			}
			if (mute.visible)
			{
				mute.setOpacity(0.4+Math.sin(highlight_timer_2)*0.0001);
			}
		}
		highlight.visible = true;
	}
	else if (highlight)
	{
		if (highlight.visible)
		{
			highlight.visible = false;
		}
	}
}