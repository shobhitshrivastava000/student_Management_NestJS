import { Injectable } from '@nestjs/common';
import { Parent } from './schema/parentschema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from 'src/student/schema/studentSchema';
import { HTTP_STATUSCODE, MESSAGES } from 'src/constant';
import { Response } from 'express';

@Injectable()
export class ParentService {
  constructor(
    @InjectModel(Parent.name)
    private parentModel: mongoose.Model<Parent>,
    @InjectModel(Parent.name)
    private studentModel: mongoose.Model<Student>,
  ) {}

  async addParent(parentdto, res: Response) {
    try {
      const parentadd = await this.parentModel.create(parentdto);
      return res.status(HTTP_STATUSCODE.CREATED).json({
        message: MESSAGES.PARENT_ADDED_SUCCESSFULLY,
        parentadd,
      });
    } catch (error) {
      return res
        .status(HTTP_STATUSCODE.SERVER_ERROR)
        .json({ message: MESSAGES.UNEXPECTED_ERROR, error: error.message });
    }
  }
  async getparent(parentid, res: Response) {
    try {
      const getparent = await this.parentModel.findById(parentid);

      return res.status(HTTP_STATUSCODE.SUCCESS).json({
        message: MESSAGES.GET_PARENT,

        getparent,
      });
    } catch (error) {
      return res
        .status(HTTP_STATUSCODE.SERVER_ERROR)
        .json({ message: MESSAGES.UNEXPECTED_ERROR, error: error.message });
    }
  }
  async updateparent(parentupdatedto, parentid, res: Response) {
    try {
      const parent = await this.parentModel.findById(parentid);
      if (!parent) {
        return res
          .status(HTTP_STATUSCODE.BAD_REQUEST)
          .json({ message: MESSAGES.PARENT_NOT_FOUND });
      }
      const updatedParent = await this.parentModel.findByIdAndUpdate(
        { _id: parentid },
        { ...parentupdatedto },
        { new: true },
      );
      return res.status(HTTP_STATUSCODE.SUCCESS).json({
        message: MESSAGES.PARENT_DATA_UPATED,
        updatedParent,
      });
    } catch (error) {
      return res
        .status(HTTP_STATUSCODE.SERVER_ERROR)
        .json({ message: MESSAGES.UNEXPECTED_ERROR, error: error.message });
    }
  }

  async deleteParent(parentid, res: Response) {
    try {
      const parent = await this.parentModel.findById(parentid);
      if (!parent) {
        return res
          .status(HTTP_STATUSCODE.BAD_REQUEST)
          .json({ message: MESSAGES.PARENT_NOT_FOUND });
      }
      const parentDeleted = await this.parentModel.findByIdAndDelete(parentid);

      return res.status(HTTP_STATUSCODE.SUCCESS).json({
        message: MESSAGES.PARENT_DELETED,
        parentDeleted,
      });
    } catch (error) {
      return res
        .status(HTTP_STATUSCODE.SERVER_ERROR)
        .json({ message: MESSAGES.UNEXPECTED_ERROR, error: error.message });
    }
  }
}
