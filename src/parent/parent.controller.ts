import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { ParentService } from './parent.service';
import { ParentDto } from './dto/parent.dto';
import { Response } from 'express';
import { ParentUpdateDto } from './dto/parentupdate.dto';

@Controller('parent')
export class ParentController {
  constructor(private parentService: ParentService) {}

  @Post('addparent')
  async addParent(
    @Body(new ValidationPipe())
    parentdto: ParentDto,
    @Res() res: Response,
  ) {
    return this.parentService.addParent(parentdto, res);
  }

  @Get('getparent/:parentid')
  async getparent(@Res() res: Response, @Param('parentid') parentid: string) {
    return this.parentService.getparent(parentid, res);
  }

  @Put('updateparent/:parentid')
  async updateparent(
    @Body() parentupdatedto: ParentUpdateDto,
    @Param('parentid') parentid: string,
    @Res() res: Response,
  ) {
    return this.parentService.updateparent(parentupdatedto, parentid, res);
  }

  @Delete('deleteparent/:parentid')
  async deleteParent(
    @Res() res: Response,
    @Param('parentid') parentid: string,
  ) {
    return this.parentService.deleteParent(parentid, res);
  }
}
