# lfg-sounds
Manage and play sounds in NodeCG bundles.

#Config

Requires a config file located at cfg/lfg-sounds.json

## Sample Contents
```
{
	"soundNames":["sub","alert"]
}

```

# Usage in Other Bundles

In your graphics import the lfg-sounds sound player.
```
<link rel="import" href="/lfg-sounds/player">
```

Play the sounds with:
```
window.lfgSound.play('sub');
```
