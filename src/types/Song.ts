import { Expose, Type } from 'class-transformer';
import { youtube_v3 } from 'googleapis';
import { YoutubeDLResponse } from './YoutubeDL';

interface ISong extends youtube_v3.Schema$Video {
  stream?: YoutubeDLResponse;
}

export class Song implements ISong {
  constructor(part: any) {
    Object.assign(this, part);
  }

  // /**
  //  * Age restriction details related to a video. This data can only be retrieved by the video owner.
  //  */
  // ageGating?: Schema$VideoAgeGating;

  @Expose()
  contentDetails?: youtube_v3.Schema$VideoContentDetails;

  @Expose()
  id?: string | null;

  @Expose()
  kind?: string | null;
  @Expose()
  player?: youtube_v3.Schema$VideoPlayer;
  // /**
  //  * The processingDetails object encapsulates information about YouTube's progress in processing the uploaded video file. The properties in the object identify the current processing status and an estimate of the time remaining until YouTube finishes processing the video. This part also indicates whether different types of data or content, such as file details or thumbnail images, are available for the video. The processingProgress object is designed to be polled so that the video uploaded can track the progress that YouTube has made in processing the uploaded video file. This data can only be retrieved by the video owner.
  //  */
  // processingDetails?: Schema$VideoProcessingDetails;
  // /**
  //  * The projectDetails object contains information about the project specific video metadata. b/157517979: This part was never populated after it was added. However, it sees non-zero traffic because there is generated client code in the wild that refers to it [1]. We keep this field and do NOT remove it because otherwise V3 would return an error when this part gets requested [2]. [1] https://developers.google.com/resources/api-libraries/documentation/youtube/v3/csharp/latest/classGoogle_1_1Apis_1_1YouTube_1_1v3_1_1Data_1_1VideoProjectDetails.html [2] http://google3/video/youtube/src/python/servers/data_api/common.py?l=1565-1569&rcl=344141677
  //  */
  // projectDetails?: Schema$VideoProjectDetails;
  // /**
  //  * The recordingDetails object encapsulates information about the location, date and address where the video was recorded.
  //  */
  // recordingDetails?: Schema$VideoRecordingDetails;
  // /**
  //  * The snippet object contains basic details about the video, such as its title, description, and category.
  //  */
  @Expose()
  snippet?: youtube_v3.Schema$VideoSnippet;

  @Expose()
  statistics?: youtube_v3.Schema$VideoStatistics;

  @Expose()
  status?: youtube_v3.Schema$VideoStatus;

  @Expose()
  suggestions?: youtube_v3.Schema$VideoSuggestions;

  @Expose()
  topicDetails?: youtube_v3.Schema$VideoTopicDetails;

  @Type(() => YoutubeDLResponse)
  @Expose()
  stream: YoutubeDLResponse;
}
