# lfg-sounds
> Manage and play sounds in NodeCG bundles.  
** Requires NodeCG@^0.7.2 **

## Usage

- Ensure NodeCG is not running.
- Install this bundle to `nodecg/bundles/lfg-sounds`.
- Create `nodecg/cfg/lfg-sounds.json` with the list of sound triggers you wish to provide.
```json
{
	"soundNames":["sub","alert"]
}
```
- Start NodeCG.
- Upload new sounds from the "Uploads" page on the dashboard.
- Go back to the main dashboard and click "EDIT SOUND ASSIGNMENTS" on the Sounds panel.
- Assign your sound files to the triggers you defined previously.
- Test sound files and adjust their volume.
- In your graphic, import the lfg-sounds sound player.
```
<link rel="import" href="/lfg-sounds/player">
```
- Play the sounds with `window.lfgSound.play`.
```
window.lfgSound.play('sub');
```

## License
NodeCG is provided under the MIT license, which is available to read in the 
[LICENSE](https://github.com/supportclass/lfg-sounds/blob/master/LICENSE) file.
