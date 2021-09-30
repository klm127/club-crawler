import Phaser from "phaser";

export default class TitleScreen extends Phaser.Scene 
{
    preload()
    {

    }
    create()
    {
        this.titleText = this.add.text(300,100, "Club Crawler");
        this.titleText.setColor(`rgb(0,0,250)`);
        this.titleText.setShadow(5,5,'gray', 5, true);
        this.titleText.setFontSize(50);
        this.titleText.setFontFamily('Consolas, Times New Roman');
        this.titleText.setOrigin(0.5,0.5);
        this.titleText.setStroke('green', 5);
        this.titleText.green = 0;
        this.titleText.red = 0;
        console.log(this);
    }
    update(time,delta) {
        if(this.titleText.green < 255) {
            this.titleText.green += 1;
            this.titleText.angle += 0.01;
            let scaleX = this.titleText.scaleX;
            this.titleText.setScale(scaleX+0.001, 1);
        } else {
            if(this.titleText.red < 255) {
                this.titleText.red += 1;
                this.titleText.angle -= 0.01;
            }
            else {
                if(this.titleText.scaleY < this.titleText.scaleX - 0.1) {
                    this.titleText.setScale(this.titleText.scaleX, this.titleText.scaleY + 0.01);
                }
            }
        }
        this.titleText.setColor(`rgb(${this.titleText.red},${this.titleText.green},250)`)

    }
}