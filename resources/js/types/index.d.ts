import { Config as ZiggyConfig } from 'ziggy-js'
export interface User {
    id: number;
    name: string;
    email: string;
    username: string
    created_at: string
    updated_at: string
    contact_number: string
    address: string;
    gender?: 'male' | 'female' | 'other' | string
    role: 'admin' | 'user';
    email_verified_at: string;
}

export interface Auth {
    user : User
}
export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
        role: 'admin' | 'user'
    };
    ziggy? : ZiggyConfig & { query : any}
    title: string,
    errors: Error & any
};
export interface Link{
    active: boolean,
    label: string,
    url: string
}
export interface Pagination{
    current_page : number  
    first_page_url : string
    from: number
    last_page: number
    last_page_url: string
    links: Link[]
    next_page_url: string
    path: string
    per_page: number
    prev_page_url: string
    to: number
    total: number
}

export interface GalleryVideo{
    id: number,
    title : string,
    source: string
    thumbnail: string
    views? : number,
    likes?: number
}

export interface GalleryVideoPagination extends Pagination{
    data : GalleryVideo[]
}

export interface LayerType  {
    index : number
    name : string,
    url : string,
    opacity? : number,
    shadow? : number,
    rotation? : number,
    hasControls? : boolean,
    animation?: null | "rotate" | "pendulum",
    originY?: "center" | "top" | "bottom"
}
export interface AnimationType {
    name : string,
    duration : number,  
    chnageValue : number,
    shadow : {
      enabled : boolean,
      distance : number,
      blur : number
    }
  }
export interface Shadow {
    enabled? : boolean,
    blur? : number,
  }

export interface Skew {
      enabled? : boolean,
      skewX? : number,
      skewY? : number
  }


export interface EditorState {
    projectName : string,
    isMenuOpened : boolean,
    openedMenu : string,
    isEditing : boolean,
    isAutoplay : boolean,
    countDown : number,
    layers : LayerType[],
    animation : null | AnimationType,
    isRecording : boolean,
    bgColor : string,
    isAnimating : boolean,
    animationName : string,
    easeType : string,
    animationDuration : number,
    animationDelta : number
    videoLength : number,
    isFullScreen : boolean,
    shadow : Shadow,
    skew : Skew,
    transformControls : boolean,
    transformLayerId : null | string,
  }


