import {useState} from "react";
import { Card } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import LoopRoundedIcon from "@mui/icons-material/LoopRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import PauseRounded from "@mui/icons-material/PauseRounded";

const Page = () => {
    const [paused, setPaused] = useState("");
  return (
    <div>
      <div className="container">
        {/* <div className='row'>
                <div className='col-md-3 border border-1 bg-black'>


                </div>
                <div className="col-md-6">

                </div>
                <div className='col-md-3 border border-2 bg-black'>

                </div>
            </div> */}
        <Card
          variant="outlined"
          sx={{
            p: 2,
            width: { xs: "100%", sm: "auto" },
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <CardMedia
            component="img"
            width="100"
            height="100"
            alt="Contemplative Reptile album cover"
            src="/images/contemplative-reptile.jpg"
            sx={{ width: { xs: "100%", sm: 100 } }}
          />
          <Stack direction="column" alignItems="center" spacing={1} useFlexGap>
            <div>
              <Typography color="text.primary" fontWeight="semiBold">
                Contemplative Reptile
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight="medium"
                textAlign="center"
                sx={{ width: "100%" }}
              >
                Sounds of Nature
              </Typography>
            </div>
            <Stack direction="row" alignItems="center" spacing={1} useFlexGap>
              <IconButton aria-label="Shuffle" disabled size="small">
                <ShuffleRoundedIcon fontSize="small" />
              </IconButton>
              <IconButton aria-label="Fast rewind" disabled size="small">
                <FastRewindRounded fontSize="small" />
              </IconButton>
              <IconButton
                aria-label={paused ? "Play music" : "Pause music"}
                onClick={() => setPaused((val) => !val)}
                sx={{ mx: 1 }}
              >
                {paused ? <PlayArrowRounded /> : <PauseRounded />}
              </IconButton>
              <IconButton aria-label="Fast forward" disabled size="small">
                <FastForwardRounded fontSize="small" />
              </IconButton>
              <IconButton aria-label="Loop music" disabled size="small">
                <LoopRoundedIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Card>
      </div>
    </div>
  );
};

export default Page;
